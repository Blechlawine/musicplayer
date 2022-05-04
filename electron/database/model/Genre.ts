import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Track from "./Track";

@Entity()
class Genre extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    name: string;

    @OneToMany(() => Track, (track) => track.genre)
    tracks: Track[];
}

export default Genre;
