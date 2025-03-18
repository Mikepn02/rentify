
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { 
  UserRound, 
  Bell, 
  Shield, 
  Globe, 
  Palette, 
  Mail,
  LockKeyhole
} from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('account');

  const handleSaveSettings = (settingType: string) => {
    toast({
      title: 'Settings saved',
      description: `Your ${settingType} settings have been saved successfully.`,
      open: true,
      onOpenChange: () => {},
    });
  };

  const settingsTabs = [
    { id: 'account', label: 'Account', icon: UserRound },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'general', label: 'General', icon: Globe },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Settings</h1>
        <p className="text-gray-500">Manage your account settings and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Settings Navigation */}
        <Card className="md:col-span-3 lg:col-span-2">
          <CardContent className="p-3">
            <nav className="space-y-1">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium
                    ${activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}
                    transition-colors duration-200
                  `}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="md:col-span-9 lg:col-span-10 space-y-6">
          {/* Account Settings */}
          {activeTab === 'account' && (
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your account details and profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="mb-4 md:mb-0">
                    <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden">
                      <img 
                        src="https://randomuser.me/api/portraits/men/44.jpg" 
                        alt="Profile" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-grow space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" defaultValue="(555) 123-4567" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input id="jobTitle" defaultValue="Property Manager" />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    id="bio" 
                    className="min-h-[100px] w-full border rounded-md p-2"
                    defaultValue="Experienced property manager with over 5 years in residential properties."
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSaveSettings('account')}>Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-500">Email Notifications</h3>
                  <div className="space-y-3">
                    {[
                      {id: 'email-bookings', label: 'New bookings'},
                      {id: 'email-payments', label: 'Payment confirmations'},
                      {id: 'email-maintenance', label: 'Maintenance requests'},
                      {id: 'email-reports', label: 'Monthly reports'},
                      {id: 'email-marketing', label: 'Marketing updates'}
                    ].map(item => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Mail size={16} className="text-gray-400" />
                          <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                        </div>
                        <Switch id={item.id} defaultChecked={item.id !== 'email-marketing'} />
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-500">App Notifications</h3>
                  <div className="space-y-3">
                    {[
                      {id: 'app-bookings', label: 'New bookings'},
                      {id: 'app-payments', label: 'Payment confirmations'},
                      {id: 'app-maintenance', label: 'Maintenance requests'},
                      {id: 'app-messages', label: 'New messages'},
                      {id: 'app-reminders', label: 'Task reminders'}
                    ].map(item => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Bell size={16} className="text-gray-400" />
                          <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                        </div>
                        <Switch id={item.id} defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSaveSettings('notification')}>Save Preferences</Button>
              </CardFooter>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-500">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-500">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <LockKeyhole size={16} className="text-gray-400" />
                        <Label htmlFor="2fa" className="cursor-pointer font-medium">Enable Two-Factor Authentication</Label>
                      </div>
                      <p className="text-sm text-gray-500 ml-6">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="2fa" />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-500">Session Management</h3>
                  <p className="text-sm text-gray-500">You're currently signed in on 1 device</p>
                  <Button variant="outline">Sign out from all devices</Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSaveSettings('security')}>Update Security</Button>
              </CardFooter>
            </Card>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how PropertyFlow looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-500">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['Light', 'Dark', 'System'].map((theme) => (
                      <Card key={theme} className={`border cursor-pointer hover:border-blue-500 transition-colors ${theme === 'Light' ? 'border-blue-500' : ''}`}>
                        <CardContent className="p-4 flex justify-center items-center">
                          <div className="text-center">
                            <div className={`h-12 w-12 rounded-full mx-auto mb-2 ${theme === 'Light' ? 'bg-white border border-gray-200' : theme === 'Dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-gray-100 to-gray-800'}`}></div>
                            <span className="text-sm font-medium">{theme}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-500">Color Accent</h3>
                  <div className="flex space-x-3">
                    {['Blue', 'Purple', 'Green', 'Orange', 'Pink'].map((color, index) => {
                      const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500'];
                      return (
                        <div key={color} className={`h-8 w-8 rounded-full cursor-pointer ${colors[index]} ${color === 'Blue' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}></div>
                      );
                    })}
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-500">Density</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['Compact', 'Default', 'Comfortable'].map((density) => (
                      <Card key={density} className={`border cursor-pointer hover:border-blue-500 transition-colors ${density === 'Default' ? 'border-blue-500' : ''}`}>
                        <CardContent className="p-3 flex justify-center items-center">
                          <span className="text-sm font-medium">{density}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSaveSettings('appearance')}>Save Preferences</Button>
              </CardFooter>
            </Card>
          )}

          {/* General Settings */}
          {activeTab === 'general' && (
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure system-wide settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-500">Language</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Display Language</Label>
                      <select id="language" className="w-full border rounded-md p-2">
                        <option value="en">English (US)</option>
                        <option value="en-gb">English (UK)</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-500">Time & Date</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <select id="timezone" className="w-full border rounded-md p-2">
                        <option value="utc">UTC (Universal Coordinated Time)</option>
                        <option value="est">Eastern Standard Time (EST)</option>
                        <option value="cst">Central Standard Time (CST)</option>
                        <option value="pst">Pacific Standard Time (PST)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <select id="dateFormat" className="w-full border rounded-md p-2">
                        <option value="mdy">MM/DD/YYYY</option>
                        <option value="dmy">DD/MM/YYYY</option>
                        <option value="ymd">YYYY/MM/DD</option>
                      </select>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-500">System Preferences</h3>
                  <div className="space-y-3">
                    {[
                      {id: 'auto-save', label: 'Auto-save drafts'},
                      {id: 'analytics', label: 'Share anonymous usage data'},
                      {id: 'sound', label: 'Enable sound effects'},
                    ].map(item => (
                      <div key={item.id} className="flex items-center justify-between">
                        <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                        <Switch id={item.id} defaultChecked={item.id !== 'sound'} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSaveSettings('general')}>Save Changes</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
