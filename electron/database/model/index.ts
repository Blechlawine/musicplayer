import Track from "./Track";
import LibraryPath from "./LibraryPath";
import Artist from "./Artist";
import Album from "./Album";
import AlbumArtist from "./AlbumArtist";
import Genre from "./Genre";
import Playlist from "./Playlist";
import PlaylistTrack from "./PlaylistTrack";

Track.LibraryPath = Track.belongsTo(LibraryPath);
LibraryPath.Tracks = LibraryPath.hasMany(Track);

Album.Artists = Album.belongsToMany(Artist, { through: AlbumArtist });
Artist.Albums = Artist.belongsToMany(Album, { through: AlbumArtist });
// Artist.AlbumArtists = Artist.hasMany(AlbumArtist);
// Album.AlbumArtists = Album.hasMany(AlbumArtist);
AlbumArtist.Albums = AlbumArtist.belongsTo(Album);
AlbumArtist.Artists = AlbumArtist.belongsTo(Artist);

Track.Album = Track.belongsTo(Album);

Track.Genre = Track.belongsTo(Genre);
Genre.Tracks = Genre.hasMany(Track);

Playlist.Tracks = Playlist.belongsToMany(Track, { through: PlaylistTrack });
Track.Playlists = Track.belongsToMany(Playlist, { through: PlaylistTrack });
PlaylistTrack.Playlist = PlaylistTrack.belongsTo(Playlist);
PlaylistTrack.Track = PlaylistTrack.belongsTo(Track);
Playlist.PlaylistTracks = Playlist.hasMany(PlaylistTrack);
Track.PlaylistTracks = Track.hasMany(PlaylistTrack);

export { Track, LibraryPath, Artist, Album, Genre, Playlist, PlaylistTrack };
