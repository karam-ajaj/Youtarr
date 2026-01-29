'use strict';

const { addColumnIfMissing, removeColumnIfExists } = require('./helpers');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add source_type column to distinguish between channels and playlists
    // Values: 'channel' (default for existing data) or 'playlist'
    await addColumnIfMissing(queryInterface, 'channels', 'source_type', {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: 'channel'
    });

    // Add playlist_id column to store YouTube playlist ID (similar to channel_id)
    // For playlists, this will store the playlist ID; for channels, it will be null
    await addColumnIfMissing(queryInterface, 'channels', 'playlist_id', {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: null
    });
  },

  async down(queryInterface, Sequelize) {
    await removeColumnIfExists(queryInterface, 'channels', 'source_type');
    await removeColumnIfExists(queryInterface, 'channels', 'playlist_id');
  }
};
