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

    @ManyToOne(() => Track, (track) => track.playlistTracks, {
        eager: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({
        name: "trackId",
    })
    track: Track;
    trackId: string;

    @ManyToOne(() => Playlist, (playlist) => playlist.playlistTracks, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn({
        name: "playlistId",
    })
    playlist: Playlist;
    playlistId: string;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}

export default PlaylistTrack;
