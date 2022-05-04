import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
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

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Album;
