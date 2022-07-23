import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import Track from "./Track";
import Playlist from "./Playlist";

@Entity()
class PlaylistTrack extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "int" })
    index: number;

    @ManyToOne(() => Track, (track) => track.playlistTrack, {
        eager: true,
    })
    @JoinColumn()
    track: Track;

    @ManyToOne(() => Playlist, (playlist) => playlist.playlistTracks)
    playlist: Playlist;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}

export default PlaylistTrack;
