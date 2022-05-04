import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import AlbumArtist from "./AlbumArtist";
import Track from "./Track";

@Entity()
class Artist extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text", unique: true })
    name: string;

    @OneToMany(() => AlbumArtist, (albumArtist) => albumArtist.artist)
    artistAlbums: AlbumArtist[];

    @ManyToMany(() => Track, (track) => track.artists)
    tracks: Track[];

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Artist;
