import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Album from "./Album";
import Artist from "./Artist";

@Entity()
class AlbumArtist extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Album, (album) => album.albumArtists)
    album: Album;

    @ManyToOne(() => Artist, (artist) => artist.artistAlbums)
    artist: Artist;
}

export default AlbumArtist;
