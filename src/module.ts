import { Module } from "@nestjs/common";
import { CatsController } from "./controller";
import { CatsService } from "./service";

@Module({
  providers: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
