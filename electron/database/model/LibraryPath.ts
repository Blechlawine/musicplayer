import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Track from "./Track";

@Entity()
class LibraryPath extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    path: string;

    @Column({ type: "text" })
    name: string;

    @OneToMany(() => Track, (track) => track.libraryPath)
    tracks: Track[];
}

export default LibraryPath;
