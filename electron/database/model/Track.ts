import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, ManyToMany } from "typeorm";
import LibraryPath from "./LibraryPath";
import PlaylistTrack from "./PlaylistTrack";
import Artist from "./Artist";
import Album from "./Album";
import Genre from "./Genre";

@Entity()
class Track extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    title: string;

    @Column({ type: "text", unique: true })
    path: string;

    @Column({ type: "int", default: 0 })
    timesPlayed: number;

    @Column({ type: "decimal" })
    duration: number;

    @Column({ type: "int" })
    seconds: number;
    @Column({ type: "int" })
    minutes: number;
    @Column({ type: "int" })
    hours: number;

    @Column({ type: "boolean", default: false })
    favourite: boolean;

    @Column({ type: "int" })
    trackNumber: number;

    @Column({type: "int"})
    diskNumber: number;

    @ManyToOne(() => LibraryPath, (libraryPath) => libraryPath.tracks)
    libraryPath: LibraryPath;

    @OneToOne(() => PlaylistTrack, (playlistTrack) => playlistTrack.track)
    playlistTrack: PlaylistTrack;

    @ManyToOne(() => Album, (album) => album.tracks)
    album: Album;

    @ManyToMany(() => Artist, (artist) => artist.tracks)
    artists: Artist[];

    @ManyToOne(() => Genre, (genre) => genre.tracks)
    genre: Genre;
}

export default Track;
