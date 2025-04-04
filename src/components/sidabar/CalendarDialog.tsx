'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Check, AlertCircle } from 'lucide-react';
import Image from 'next/image';

// Calendar service types
type CalendarService = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

// Available calendar services
const calendarServices: CalendarService[] = [
  {
    id: 'google',
    name: 'Google Calendar',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg',
    description: 'Sync your tasks with Google Calendar',
  },
  {
    id: 'apple',
    name: 'Apple Calendar',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/ICloud_logo.svg',
    description: 'Sync your tasks with Apple Calendar',
  },
  {
    id: 'outlook',
    name: 'Outlook Calendar',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg',
    description: 'Sync your tasks with Outlook Calendar',
  },
];

interface CalendarIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CalendarDialog({
  open,
  onOpenChange,
}: CalendarIntegrationDialogProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('connect');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [syncOptions, setSyncOptions] = useState({
    syncCompletedTasks: true,
    addReminders: true,
    syncBidirectional: false,
  });

  const handleConnect = () => {
    if (!selectedService) return;

    setIsConnecting(true);

    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setActiveTab('configure');
    }, 1500);
  };

  const handleSaveConfiguration = () => {
    // In a real app, this would save the sync configuration
    setTimeout(() => {
      onOpenChange(false);

      // Show a notification that the calendar is connected
      alert(
        'Calendar connected successfully! Your tasks will now sync with your calendar.'
      );
    }, 500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSelectedService(null);
    setActiveTab('connect');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Calendar Integration</DialogTitle>
          <DialogDescription>
            Connect your calendar to sync tasks and deadlines
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="connect"
              disabled={activeTab === 'configure' && !isConnected}
            >
              Connect Calendar
            </TabsTrigger>
            <TabsTrigger value="configure" disabled={!isConnected}>
              Configure Sync
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connect" className="space-y-4 py-4">
            {isConnected ? (
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">
                    Successfully connected to{' '}
                    {
                      calendarServices.find((s) => s.id === selectedService)
                        ?.name
                    }
                  </AlertDescription>
                </Alert>
                <Button
                  onClick={() => setActiveTab('configure')}
                  className="w-full"
                >
                  Configure Sync Settings
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDisconnect}
                  className="w-full"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Calendar Service</Label>
                    <RadioGroup
                      value={selectedService || ''}
                      onValueChange={setSelectedService}
                      className="space-y-2"
                    >
                      {calendarServices.map((service) => (
                        <div
                          key={service.id}
                          className={`flex items-center space-x-3 rounded-md border p-3 cursor-pointer ${
                            selectedService === service.id
                              ? 'border-primary'
                              : 'border-input'
                          }`}
                          onClick={() => setSelectedService(service.id)}
                        >
                          <RadioGroupItem value={service.id} id={service.id} />
                          <Image
                            src={service.icon || '/placeholder.svg'}
                            alt={service.name}
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain"
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor={service.id}
                              className="cursor-pointer"
                            >
                              {service.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-700">
                      {`You'll be redirected to authorize access to your calendar.`}
                    </AlertDescription>
                  </Alert>
                </div>

                <DialogFooter>
                  <Button
                    onClick={handleConnect}
                    disabled={!selectedService || isConnecting}
                    className="w-full"
                  >
                    {isConnecting ? 'Connecting...' : 'Connect Calendar'}
                  </Button>
                </DialogFooter>
              </>
            )}
          </TabsContent>

          <TabsContent value="configure" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Sync Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="syncCompletedTasks"
                      checked={syncOptions.syncCompletedTasks}
                      onChange={(e) =>
                        setSyncOptions({
                          ...syncOptions,
                          syncCompletedTasks: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label
                      htmlFor="syncCompletedTasks"
                      className="cursor-pointer"
                    >
                      Sync completed tasks
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="addReminders"
                      checked={syncOptions.addReminders}
                      onChange={(e) =>
                        setSyncOptions({
                          ...syncOptions,
                          addReminders: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="addReminders" className="cursor-pointer">
                      Add reminders for tasks with due dates
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="syncBidirectional"
                      checked={syncOptions.syncBidirectional}
                      onChange={(e) =>
                        setSyncOptions({
                          ...syncOptions,
                          syncBidirectional: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label
                      htmlFor="syncBidirectional"
                      className="cursor-pointer"
                    >
                      Two-way sync (calendar events can create tasks)
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Sync Frequency</Label>
                <RadioGroup defaultValue="realtime" className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="realtime" id="realtime" />
                    <Label htmlFor="realtime" className="cursor-pointer">
                      Real-time
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hourly" id="hourly" />
                    <Label htmlFor="hourly" className="cursor-pointer">
                      Hourly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily" className="cursor-pointer">
                      Daily
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Alert className="bg-amber-50 border-amber-200">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-700">
                  Tasks with due dates will appear as events in your calendar.
                </AlertDescription>
              </Alert>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setActiveTab('connect')}
                className="sm:order-1"
              >
                Back
              </Button>
              <Button onClick={handleSaveConfiguration} className="sm:order-2">
                Save Configuration
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
