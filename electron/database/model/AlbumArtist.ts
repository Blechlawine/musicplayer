import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
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

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}

export default AlbumArtist;
