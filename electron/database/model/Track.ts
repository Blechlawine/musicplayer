import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinTable,
} from "typeorm";
import LibraryPath from "./LibraryPath";
import PlaylistTrack from "./PlaylistTrack";
import Artist from "./Artist";
import Album from "./Album";
import Genre from "./Genre";

@Entity()
class Track extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "text", default: "" })
    title?: string;

    @Column({ type: "text", unique: true })
    path!: string;

    @Column({ type: "int", default: 0 })
    timesPlayed!: number;

    @Column({ type: "decimal", nullable: true })
    duration?: number;

    @Column({ type: "int" })
    seconds!: number;
    @Column({ type: "int" })
    minutes!: number;
    @Column({ type: "int" })
    hours!: number;

    @Column({ type: "boolean", default: false })
    favourite!: boolean;

    @Column({ type: "int", nullable: true })
    trackNumber: number | null;

    @Column({ type: "int", nullable: true })
    diskNumber: number | null;

    @Column({ type: "boolean", default: true })
    exists!: boolean;

    @ManyToOne(() => LibraryPath, (libraryPath) => libraryPath.tracks)
    libraryPath: LibraryPath;

    @OneToOne(() => PlaylistTrack, (playlistTrack) => playlistTrack.track)
    playlistTrack: PlaylistTrack;

    @ManyToOne(() => Album, (album) => album.tracks)
    album: Album;

    @ManyToMany(() => Artist, (artist) => artist.tracks)
    @JoinTable()
    artists: Artist[];

    @ManyToMany(() => Genre, (genre) => genre.tracks)
    @JoinTable()
    genres: Genre[];

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Track;
