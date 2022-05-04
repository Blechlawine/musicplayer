import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import AlbumArtist from "./AlbumArtist";
import Track from "./Track";

@Entity()
class Album extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    title: string;

    @OneToMany(() => AlbumArtist, (albumArtist) => albumArtist.album)
    albumArtists: AlbumArtist[];

    @OneToMany(() => Track, (track) => track.album)
    tracks: Track[];
}

export default Album;
