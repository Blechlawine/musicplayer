import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinTable,
} from "typeorm";
import Album from "./Album";
import Track from "./Track";

@Entity()
class Artist extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text", unique: true })
    name: string;

    @ManyToMany(() => Album, (album) => album.artists, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinTable()
    albums: Album[];

    @ManyToMany(() => Track, (track) => track.artists)
    tracks: Track[];

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Artist;
