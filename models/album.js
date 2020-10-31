/* eslint-disable indent */
module.exports = function(sequelize, DataTypes) {
    var Album = sequelize.define("Album", {
        albumName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        releaseYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        albumArt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cd: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        cassette: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        vinylSeven: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        vinylTwelve: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        eightTrack: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        digital: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        condition: {
            type: DataTypes.STRING,
            allowNull: true
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    });
    return Album;
};