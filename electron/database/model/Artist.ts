import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import AlbumArtist from "./AlbumArtist";
import Track from "./Track";

@Entity()
class Artist extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    name: string;

    @OneToMany(() => AlbumArtist, (albumArtist) => albumArtist.artist)
    artistAlbums: AlbumArtist[];

    @ManyToMany(() => Track, (track) => track.artists)
    tracks: Track[];
}

export default Artist;
