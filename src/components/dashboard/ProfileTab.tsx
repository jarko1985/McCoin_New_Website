'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import {
  MdCancel,
  MdEdit,
  MdSecurity,
  MdNotifications,
  MdLanguage,
  MdVisibility,
  MdVisibilityOff,
} from 'react-icons/md';
import {
  FaPause,
  FaUserShield,
  FaChartLine,
  FaHistory,
  FaCog,
  FaBell,
  FaGlobe,
  FaShieldAlt,
} from 'react-icons/fa';
import { GoVerified, GoUnverified } from 'react-icons/go';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const loginData = [
  {
    time: 'Mon, Jan 22 2024 5:45:52 PM',
    device: 'PC / Mac OS / Safari',
    ip: '45.13.191.108',
    location: 'Oslo, Oslo County, Norway',
    status: 'active',
  },
  {
    time: 'Sun, Jan 07 2024 7:05:49 PM',
    device: 'PC / Mac OS / Safari',
    ip: '51.22.48.22',
    location: 'Oshnavieh, Iran',
    status: 'inactive',
  },
  {
    time: 'Wed, Nov 22 2023 12:14:42 PM',
    device: 'PC / Mac OS / Safari',
    ip: '191.101.174.68',
    location: 'Jersey City, United States',
    status: 'inactive',
  },
];

// Mock user statistics
const userStats = {
  totalTrades: 156,
  successfulTrades: 142,
  totalVolume: '$45,678.90',
  accountAge: '2 years 3 months',
  lastLogin: '2 hours ago',
  verificationLevel: 'Level 2',
  securityScore: 85,
};

// Mock activity timeline
const activityTimeline = [
  {
    id: 1,
    type: 'trade',
    title: 'BTC/USDT Trade Executed',
    description: 'Bought 0.5 BTC at $43,250',
    time: '2 hours ago',
    amount: '+$21,625',
    status: 'completed',
  },
  {
    id: 2,
    type: 'withdrawal',
    title: 'Withdrawal Processed',
    description: 'Withdrew $1,500 to Bank Account',
    time: '1 day ago',
    amount: '-$1,500',
    status: 'completed',
  },
  {
    id: 3,
    type: 'verification',
    title: 'KYC Verification Approved',
    description: 'Identity verification completed',
    time: '3 days ago',
    amount: '',
    status: 'completed',
  },
  {
    id: 4,
    type: 'login',
    title: 'New Device Login',
    description: 'Login from new device detected',
    time: '1 week ago',
    amount: '',
    status: 'warning',
  },
];

export default function ProfileTab() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated' && session;
  const isLoading = status === 'loading';
  const router = useRouter();
  const t = useTranslations('dashboard.profile');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  // State for form fields
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: session?.user?.name?.split(' ')[0] || '',
    lastName: session?.user?.name?.split(' ').slice(1).join(' ') || '',
    email: session?.user?.email || '',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    timezone: 'UTC-5',
  });

  // State for settings
  const [settings, setSettings] = useState({
    twoFactorAuth: true,
    emailNotifications: true,
    smsNotifications: false,
    tradingNotifications: true,
    securityAlerts: true,
    marketingEmails: false,
  });

  // Debug log for development
  if (process.env.NODE_ENV === 'development' && session) {
    console.log('👤 ProfileTab: Session user data', {
      name: session.user?.name,
      email: session.user?.email,
      id: session.user?.id,
      image: session.user?.image,
      expires: session.expires,
    });
  }

  // Show loading state
  if (isLoading) {
    return (
      <main className="flex-1 border-[0.5px] rounded-md border-[#DAE6EA]">
        <div className="flex items-center justify-center p-6">
          <div className="text-[#DAE6EA]">Loading profile...</div>
        </div>
      </main>
    );
  }

  // Show error state if not authenticated
  if (!isAuthenticated) {
    return (
      <main className="flex-1 border-[0.5px] rounded-md border-[#DAE6EA]">
        <div className="flex items-center justify-center p-6">
          <div className="text-red-500">Please log in to view your profile.</div>
        </div>
      </main>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <main className="flex-1 border-[0.5px] rounded-md border-[#DAE6EA] bg-[#07153B]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 p-6"
      >
        {/* Enhanced Header with Stats */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-[#081935] to-[#0a1f3d] rounded-2xl p-6 border border-[#1a2f4d]"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <Avatar className="h-20 w-20 border-4 border-[#EC3B3B]/20">
                  <AvatarImage src={session?.user?.image || ''} />
                  <AvatarFallback className="bg-gradient-to-br from-[#EC3B3B] to-[#D13535] text-white text-2xl font-bold">
                    {session?.user?.name?.[0]?.toUpperCase() ||
                      session?.user?.email?.[0]?.toUpperCase() ||
                      'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <GoVerified className="w-3 h-3 text-white" />
                </div>
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white">{session?.user?.name || 'User'}</h2>
                <p className="text-[#DAE6EA]">{session?.user?.email || ''}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-500/20 text-green-400 border-green-500/30"
                  >
                    <GoVerified className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                  <Badge variant="outline" className="border-[#EC3B3B]/30 text-[#EC3B3B]">
                    Level 2
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-[#0f294d]/50 rounded-lg border border-[#1a2f4d]">
                <div className="text-2xl font-bold text-[#EC3B3B]">{userStats.totalTrades}</div>
                <div className="text-xs text-[#DAE6EA]">Total Trades</div>
              </div>
              <div className="text-center p-3 bg-[#0f294d]/50 rounded-lg border border-[#1a2f4d]">
                <div className="text-2xl font-bold text-green-400">
                  {userStats.successfulTrades}
                </div>
                <div className="text-xs text-[#DAE6EA]">Successful</div>
              </div>
              <div className="text-center p-3 bg-[#0f294d]/50 rounded-lg border border-[#1a2f4d]">
                <div className="text-lg font-bold text-blue-400">{userStats.totalVolume}</div>
                <div className="text-xs text-[#DAE6EA]">Total Volume</div>
              </div>
              <div className="text-center p-3 bg-[#0f294d]/50 rounded-lg border border-[#1a2f4d]">
                <div className="text-lg font-bold text-purple-400">{userStats.securityScore}%</div>
                <div className="text-xs text-[#DAE6EA]">Security Score</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-[#081935] border border-[#1a2f4d]">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-[#EC3B3B] data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="data-[state=active]:bg-[#EC3B3B] data-[state=active]:text-white"
              >
                Security
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="data-[state=active]:bg-[#EC3B3B] data-[state=active]:text-white"
              >
                Activity
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-[#EC3B3B] data-[state=active]:text-white"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <Card className="bg-[#081935] border-[#1a2f4d]">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                      <FaUserShield className="w-5 h-5 text-[#EC3B3B]" />
                      Personal Information
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-[#EC3B3B] hover:text-[#D13535]"
                    >
                      <MdEdit className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-[#DAE6EA]">First Name</label>
                        <Input
                          value={userData.firstName}
                          onChange={e => setUserData({ ...userData, firstName: e.target.value })}
                          disabled={!isEditing}
                          className="bg-[#0f294d] border-[#1a2f4d] text-white"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-[#DAE6EA]">Last Name</label>
                        <Input
                          value={userData.lastName}
                          onChange={e => setUserData({ ...userData, lastName: e.target.value })}
                          disabled={!isEditing}
                          className="bg-[#0f294d] border-[#1a2f4d] text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-[#DAE6EA]">Email</label>
                      <Input
                        value={userData.email}
                        readOnly
                        className="bg-[#0f294d] border-[#1a2f4d] text-white cursor-not-allowed"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-[#DAE6EA]">Phone</label>
                        <Input
                          value={userData.phone}
                          onChange={e => setUserData({ ...userData, phone: e.target.value })}
                          disabled={!isEditing}
                          className="bg-[#0f294d] border-[#1a2f4d] text-white"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-[#DAE6EA]">Country</label>
                        <Input
                          value={userData.country}
                          onChange={e => setUserData({ ...userData, country: e.target.value })}
                          disabled={!isEditing}
                          className="bg-[#0f294d] border-[#1a2f4d] text-white"
                        />
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex gap-2 pt-4">
                        <Button
                          onClick={() => setIsEditing(false)}
                          className="bg-[#EC3B3B] hover:bg-[#D13535]"
                        >
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Account Statistics */}
                <Card className="bg-[#081935] border-[#1a2f4d]">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FaChartLine className="w-5 h-5 text-[#EC3B3B]" />
                      Account Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-[#0f294d]/50 rounded-lg border border-[#1a2f4d]">
                        <div className="text-sm text-[#DAE6EA]">Account Age</div>
                        <div className="text-lg font-semibold text-white">
                          {userStats.accountAge}
                        </div>
                      </div>
                      <div className="p-4 bg-[#0f294d]/50 rounded-lg border border-[#1a2f4d]">
                        <div className="text-sm text-[#DAE6EA]">Last Login</div>
                        <div className="text-lg font-semibold text-white">
                          {userStats.lastLogin}
                        </div>
                      </div>
                      <div className="p-4 bg-[#0f294d]/50 rounded-lg border border-[#1a2f4d]">
                        <div className="text-sm text-[#DAE6EA]">Verification Level</div>
                        <div className="text-lg font-semibold text-green-400">
                          {userStats.verificationLevel}
                        </div>
                      </div>
                      <div className="p-4 bg-[#0f294d]/50 rounded-lg border border-[#1a2f4d]">
                        <div className="text-sm text-[#DAE6EA]">Success Rate</div>
                        <div className="text-lg font-semibold text-blue-400">
                          {Math.round((userStats.successfulTrades / userStats.totalTrades) * 100)}%
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Security Settings */}
                <Card className="bg-[#081935] border-[#1a2f4d]">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <MdSecurity className="w-5 h-5 text-[#EC3B3B]" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Separator className="bg-[#1a2f4d]" />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">Security Alerts</div>
                        <div className="text-sm text-[#DAE6EA]">
                          Get notified of suspicious activity
                        </div>
                      </div>
                      <Switch
                        checked={settings.securityAlerts}
                        onCheckedChange={checked =>
                          setSettings({ ...settings, securityAlerts: checked })
                        }
                      />
                    </div>
                    <Separator className="bg-[#1a2f4d]" />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">Trading Notifications</div>
                        <div className="text-sm text-[#DAE6EA]">
                          Receive alerts for trading activities
                        </div>
                      </div>
                      <Switch
                        checked={settings.tradingNotifications}
                        onCheckedChange={checked =>
                          setSettings({ ...settings, tradingNotifications: checked })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Account Control */}
                <Card className="bg-[#081935] border-[#1a2f4d]">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FaShieldAlt className="w-5 h-5 text-[#EC3B3B]" />
                      Account Control
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-400 border-red-500/30 hover:bg-red-500/10"
                      >
                        <FaPause className="mr-2" />
                        Freeze Account
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-400 border-red-500/30 hover:bg-red-500/10"
                      >
                        <MdCancel className="mr-2" />
                        Cancel Account
                      </Button>
                    </div>
                    <Separator className="bg-[#1a2f4d]" />
                    <div>
                      <div className="font-medium text-white mb-2">Password</div>
                      <div className="flex gap-2">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value="••••••••••••••••"
                          readOnly
                          className="bg-[#0f294d] border-[#1a2f4d] text-white cursor-not-allowed"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                        </Button>
                      </div>
                      <Button variant="outline" className="mt-2 w-full">
                        Reset Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card className="bg-[#081935] border-[#1a2f4d]">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FaHistory className="w-5 h-5 text-[#EC3B3B]" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activityTimeline.map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-3 bg-[#0f294d]/30 rounded-lg border border-[#1a2f4d]"
                        >
                          <div
                            className={`w-3 h-3 rounded-full mt-2 ${
                              activity.status === 'completed'
                                ? 'bg-green-500'
                                : activity.status === 'warning'
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                          />
                          <div className="flex-1">
                            <div className="font-medium text-white">{activity.title}</div>
                            <div className="text-sm text-[#DAE6EA]">{activity.description}</div>
                            <div className="text-xs text-[#DAE6EA] mt-1">{activity.time}</div>
                          </div>
                          {activity.amount && (
                            <div
                              className={`font-semibold ${
                                activity.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'
                              }`}
                            >
                              {activity.amount}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Login History */}
                <Card className="bg-[#081935] border-[#1a2f4d]">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FaHistory className="w-5 h-5 text-[#EC3B3B]" />
                      Login History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {loginData.map((entry, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-[#0f294d]/30 rounded-lg border border-[#1a2f4d]"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-[#DAE6EA]">{entry.time}</div>
                            <Badge
                              variant={entry.status === 'active' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {entry.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-[#DAE6EA] space-y-1">
                            <div>Device: {entry.device}</div>
                            <div>IP: {entry.ip}</div>
                            <div>Location: {entry.location}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Notification Settings */}
                <Card className="bg-[#081935] border-[#1a2f4d]">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FaBell className="w-5 h-5 text-[#EC3B3B]" />
                      Notification Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">Email Notifications</div>
                        <div className="text-sm text-[#DAE6EA]">Receive updates via email</div>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={checked =>
                          setSettings({ ...settings, emailNotifications: checked })
                        }
                      />
                    </div>
                    <Separator className="bg-[#1a2f4d]" />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">SMS Notifications</div>
                        <div className="text-sm text-[#DAE6EA]">Receive updates via SMS</div>
                      </div>
                      <Switch
                        checked={settings.smsNotifications}
                        onCheckedChange={checked =>
                          setSettings({ ...settings, smsNotifications: checked })
                        }
                      />
                    </div>
                    <Separator className="bg-[#1a2f4d]" />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">Marketing Emails</div>
                        <div className="text-sm text-[#DAE6EA]">Receive promotional content</div>
                      </div>
                      <Switch
                        checked={settings.marketingEmails}
                        onCheckedChange={checked =>
                          setSettings({ ...settings, marketingEmails: checked })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Preferences */}
                <Card className="bg-[#081935] border-[#1a2f4d]">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FaCog className="w-5 h-5 text-[#EC3B3B]" />
                      Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-[#DAE6EA]">Language</label>
                      <div className="flex items-center gap-2 mt-2">
                        <FaGlobe className="w-4 h-4 text-[#EC3B3B]" />
                        <select className="bg-[#0f294d] border-[#1a2f4d] text-white rounded px-3 py-2 w-full">
                          <option value="en">English</option>
                          <option value="ar">العربية</option>
                          <option value="es">Español</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-[#DAE6EA]">Timezone</label>
                      <Input
                        value={userData.timezone}
                        onChange={e => setUserData({ ...userData, timezone: e.target.value })}
                        className="bg-[#0f294d] border-[#1a2f4d] text-white mt-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[#DAE6EA]">Currency</label>
                      <select className="bg-[#0f294d] border-[#1a2f4d] text-white rounded px-3 py-2 w-full mt-2">
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </main>
  );
}
