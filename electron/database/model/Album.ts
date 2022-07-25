import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import Artist from "./Artist";
import Track from "./Track";

@Entity()
class Album extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    title: string;

    @ManyToMany(() => Artist, (artist) => artist.albums, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        cascade: true,
    })
    artists: Artist[];

    @OneToMany(() => Track, (track) => track.album)
    tracks: Track[];

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Album;
