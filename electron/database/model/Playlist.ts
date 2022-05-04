import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import PlaylistTrack from "./PlaylistTrack";

@Entity()
class Playlist extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    title: string;

    @OneToMany(() => PlaylistTrack, (playlistTrack) => playlistTrack.playlist)
    playlistTracks: PlaylistTrack[];
}

export default Playlist;
