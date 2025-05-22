import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface PlayerProfile {
  player_id: number;
  '@id'?: string;
  url: string;
  name?: string;
  username: string;
  followers: number;
  country: string;
  location?: string;
  status: string;
  title?: string;
  joined: number;
  last_online: number;
  is_streamer?: boolean;
  verified?: boolean;
  league?: string;
  avatar?: string;
  streaming_platforms?: string[];
  fide?: number;
  twitch_url?: string;
}

const GrandMasterProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.chess.com/pub/player/${username}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch player profile');
        }
        
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-md relative" role="alert">
        <strong className="font-bold">Not Found!</strong>
        <span className="block sm:inline"> No profile information found for this player.</span>
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const countryCode = profile.country?.split('/').pop()?.toLowerCase() || '';

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to list
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary-500 text-white p-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:mr-6 mb-4 md:mb-0">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.username}
                  className="h-32 w-32 rounded-full border-4 border-white object-cover"
                />
              ) : (
                <div className="h-32 w-32 rounded-full border-4 border-white bg-primary-100 flex items-center justify-center text-primary-700 text-4xl font-bold">
                  {profile.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{profile.username}</h1>
              <p className="text-xl opacity-90">{profile.title || 'GM'} • {profile.username}</p>
              {countryCode && (
                <div className="flex items-center mt-2">
                  <img 
                    src={`https://flagcdn.com/16x12/${countryCode}.png`}
                    alt={countryCode.toUpperCase()}
                    className="mr-2"
                  />
                  <span>{countryCode.toUpperCase()}</span>
                </div>
              )}
              {profile.verified && (
                <div className="mt-2 flex items-center">
                  <svg className="w-5 h-5 text-blue-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Verified Account</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold mb-3 text-gray-700">Player Information</h2>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-gray-800 bg-gray-200 px-3 py-1 rounded">{profile.status || 'N/A'}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-600">Followers:</span>
                  <span className="font-medium text-gray-800 bg-gray-200 px-3 py-1 rounded">{profile.followers}</span>
                </li>
                {profile.league && (
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">League:</span>
                    <span className="font-medium text-gray-800 bg-gray-200 px-3 py-1 rounded">{profile.league}</span>
                  </li>
                )}
                {profile.fide && (
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">FIDE Rating:</span>
                    <span className="font-medium text-gray-800 bg-gray-200 px-3 py-1 rounded">{profile.fide}</span>
                  </li>
                )}
                <li className="flex justify-between items-center">
                  <span className="text-gray-600">Joined:</span>
                  <span className="font-medium text-gray-800 bg-gray-200 px-3 py-1 rounded">{formatDate(profile.joined)}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-600">Last Online:</span>
                  <span className="font-medium text-gray-800 bg-gray-200 px-3 py-1 rounded">{formatDate(profile.last_online)}</span>
                </li>
                {profile.is_streamer && (
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Streamer:</span>
                    <span className="font-medium text-gray-800 bg-gray-200 px-3 py-1 rounded">Yes</span>
                  </li>
                )}
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold mb-3 text-gray-700">Links</h2>
              <ul className="space-y-3">
                <li>
                  <a 
                    href={profile.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Chess.com Profile
                  </a>
                </li>
                {profile.twitch_url && (
                  <li>
                    <a 
                      href={profile.twitch_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                      </svg>
                      Twitch Channel
                    </a>
                  </li>
                )}
                <li>
                  <a 
                    href={`https://www.chess.com/stats/live/rapid/${profile.username}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Statistics
                  </a>
                </li>
                <li>
                  <a 
                    href={`https://www.chess.com/games/archive/${profile.username}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Games
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrandMasterProfile; 