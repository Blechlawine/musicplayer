import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import Track from "./Track";
import Playlist from "./Playlist";

@Entity()
class PlaylistTrack extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "int"})
    index: number;

    @OneToOne(() => Track, track => track.playlistTrack)
    @JoinColumn()
    track: Track;

    @ManyToOne(() => Playlist, playlist => playlist.playlistTracks)
    playlist: Playlist[];
}

export default PlaylistTrack;
