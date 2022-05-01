// src/users/usersController.ts
import {
    Controller,
    Get,
    Path, Query,
    Route,
} from "tsoa";
import {getGeoJSON} from "../Service/Cache";
import axios from "axios";

@Route("tiles/tiles")
export class GetTile extends Controller {
    @Get("{tile}/{z}/{x}/{y}")
    public async getUser(
        @Path() tile: string,
        @Path() z: number,
        @Path() x: number,
        @Path() y: number,
    ): Promise<any> {
        return (await getGeoJSON(tile)).getTileExtract(z, x, y)
    }
    @Get("/custom/{tile}/{Slat}/{Slong}/{Nlat}/{Nlong}")
    public async getOwnTiles(
        @Path() tile: string,
        @Path() Slat: number,
        @Path() Slong: number,
        @Path() Nlat: number,
        @Path() Nlong: number,
        @Query() limit: number,
    ): Promise<any> {
        const result = await (await getGeoJSON(tile)).getOwnExtract(Slat, Slong, Nlat,Nlong, limit)
        const onlyIds = result.features.map(x => x.properties.baumid);


        const populatedData = await axios.post(process.env.BAUMSCHEIBEN_SERVICE_URL + '/baumscheibe/baumscheibe/bulk', {
            baumids: onlyIds,
        })

        for (let i = 0; i < result.features.length; i++) {
            const baumId = result.features[i].properties.baumid;
            const found = populatedData.data.find((x: { baumid: string; }) => x.baumid === baumId);
            result.features[i].properties.baumscheibenStatus = found.type;
        }
        return result;
    }
}
