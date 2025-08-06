'use client';

import { useState } from 'react';
import { ArrowLeft, Plus, Trophy, Calendar, MapPin, Users, Clock, Star, Filter } from 'lucide-react';
import Link from 'next/link';

interface Tournament {
  id: number;
  name: string;
  date: string;
  location: string;
  participants: number;
  maxParticipants: number;
  entryFee: number;
  prize: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  format: 'Single Elimination' | 'Double Elimination' | 'Round Robin';
  registrationDeadline: string;
}

export default function Tournament() {
  const [activeTab, setActiveTab] = useState<'browse' | 'my-tournaments' | 'create'>('browse');
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'ongoing'>('all');
  
  // Mock tournament data
  const tournaments: Tournament[] = [
    {
      id: 1,
      name: 'Summer Championship 2024',
      date: 'June 15, 2024',
      location: 'Central Sports Complex',
      participants: 24,
      maxParticipants: 32,
      entryFee: 25,
      prize: '$500 Winner + Trophy',
      status: 'upcoming',
      difficulty: 'Advanced',
      format: 'Single Elimination',
      registrationDeadline: 'June 10, 2024'
    },
    {
      id: 2,
      name: 'Beginner Friendly Tournament',
      date: 'June 8, 2024',
      location: 'Community Center Courts',
      participants: 12,
      maxParticipants: 16,
      entryFee: 15,
      prize: 'Medals for Top 3',
      status: 'ongoing',
      difficulty: 'Beginner',
      format: 'Round Robin',
      registrationDeadline: 'June 5, 2024'
    },
    {
      id: 3,
      name: 'Weekend Warriors Cup',
      date: 'May 25, 2024',
      location: 'Riverside Park',
      participants: 20,
      maxParticipants: 20,
      entryFee: 20,
      prize: '$300 Winner',
      status: 'completed',
      difficulty: 'Intermediate',
      format: 'Double Elimination',
      registrationDeadline: 'May 20, 2024'
    }
  ];

  const myTournaments = tournaments.filter(t => [1, 3].includes(t.id)); // User is in tournaments 1 and 3

  const filteredTournaments = tournaments.filter(tournament => {
    if (filterStatus === 'all') return true;
    return tournament.status === filterStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'ongoing': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 dark:text-green-400';
      case 'Intermediate': return 'text-yellow-600 dark:text-yellow-400';
      case 'Advanced': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Link href="/" className="text-gray-600 dark:text-gray-400">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tournaments
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Compete and improve your game
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {[
          { key: 'browse', label: 'Browse' },
          { key: 'my-tournaments', label: 'My Events' },
          { key: 'create', label: 'Create' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === key
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Browse Tournaments */}
      {activeTab === 'browse' && (
        <div className="space-y-4">
          {/* Filter */}
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">All Tournaments</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
            </select>
          </div>

          {/* Tournament List */}
          <div className="space-y-3">
            {filteredTournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {tournament.name}
                    </h3>
                    <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className={`px-2 py-1 rounded-full ${getStatusColor(tournament.status)}`}>
                        {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                      </span>
                      <span className={getDifficultyColor(tournament.difficulty)}>
                        {tournament.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${tournament.entryFee}
                    </div>
                    <div className="text-xs text-gray-500">Entry Fee</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Calendar size={14} />
                    <span>{tournament.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={14} />
                    <span>{tournament.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={14} />
                    <span>{tournament.participants}/{tournament.maxParticipants} players</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy size={14} />
                    <span>{tournament.prize}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {tournament.format} • Deadline: {tournament.registrationDeadline}
                    </div>
                    <button
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        tournament.status === 'upcoming'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : tournament.status === 'ongoing'
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-400 text-white cursor-not-allowed'
                      }`}
                      disabled={tournament.status === 'completed'}
                    >
                      {tournament.status === 'upcoming' ? 'Register' : 
                       tournament.status === 'ongoing' ? 'View Bracket' : 'Completed'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Tournaments */}
      {activeTab === 'my-tournaments' && (
        <div className="space-y-4">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Tournaments you've joined or created
          </div>
          
          {myTournaments.length > 0 ? (
            <div className="space-y-3">
              {myTournaments.map((tournament) => (
                <div
                  key={tournament.id}
                  className="bg-white dark:bg-gray-800 border-l-4 border-blue-500 border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {tournament.name}
                    </h3>
                    <Star size={16} className="text-yellow-500" />
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} />
                      <span>{tournament.date}</span>
                      <span className={`ml-auto px-2 py-1 rounded-full text-xs ${getStatusColor(tournament.status)}`}>
                        {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} />
                      <span>{tournament.location}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-3 text-sm rounded-lg hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                    {tournament.status === 'upcoming' && (
                      <button className="bg-red-600 text-white py-2 px-3 text-sm rounded-lg hover:bg-red-700 transition-colors">
                        Withdraw
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
              <Trophy size={24} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                You haven't joined any tournaments yet
              </p>
            </div>
          )}
        </div>
      )}

      {/* Create Tournament */}
      {activeTab === 'create' && (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
              Create Tournament
            </h3>
            <p className="text-blue-700 dark:text-blue-400 text-sm">
              Organize your own tournament and invite players from your community
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tournament Name
              </label>
              <input
                type="text"
                placeholder="e.g., Spring Championship 2024"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Entry Fee ($)
                </label>
                <input
                  type="number"
                  placeholder="25"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="Venue name or address"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Max Players
                </label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>8</option>
                  <option>16</option>
                  <option>32</option>
                  <option>64</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Difficulty
                </label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Open</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tournament Format
              </label>
              <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option>Single Elimination</option>
                <option>Double Elimination</option>
                <option>Round Robin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prize Description
              </label>
              <input
                type="text"
                placeholder="e.g., $500 Winner + Trophy"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <button className="w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors font-semibold">
              <div className="flex items-center justify-center space-x-2">
                <Plus size={20} />
                <span>Create Tournament</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}