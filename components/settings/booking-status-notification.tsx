"use client";

import { updateNotificationSetting } from "@/app/(protected)/settings/actions";
import { AccountProfile } from "@/app/(protected)/settings/types";
import NotificationSection from "@/components/settings/notification-section";
import { useCallback, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

interface BookingStatusNotificationProps {
  defaultValues: AccountProfile;
}

type NotificationType = "booking" | "reject";

interface ChannelState {
  enabled: boolean;
  booking: boolean;
  reject: boolean;
  allChecked: boolean;
}

// Helper function to initialize channel state from settings
const initializeChannelState = (
  settings: Array<{ channel: string; is_enable: boolean; type: string }>,
  channel: string,
): ChannelState => {
  const channelSettings = settings.filter((s) => s.channel === channel);
  const allSetting = channelSettings.find((s) => s.type === "all");
  const isAllEnabled = allSetting?.is_enable || false;

  const booking =
    channelSettings.find((s) => s.type === "booking")?.is_enable ||
    isAllEnabled;
  const reject =
    channelSettings.find((s) => s.type === "reject")?.is_enable || isAllEnabled;

  return {
    enabled: channelSettings.some((s) => s.is_enable),
    booking,
    reject,
    allChecked: booking && reject,
  };
};

const BookingStatusNotification = ({
  defaultValues,
}: BookingStatusNotificationProps) => {
  const [isPending, startTransition] = useTransition();

  // Initialize states for both channels
  const [emailState, setEmailState] = useState<ChannelState>(() =>
    initializeChannelState(defaultValues.notification_settings || [], "email"),
  );

  const [webState, setWebState] = useState<ChannelState>(() =>
    initializeChannelState(defaultValues.notification_settings || [], "web"),
  );

  // Sync "All" checkbox with individual options
  useEffect(() => {
    setEmailState((prev) => ({
      ...prev,
      allChecked: prev.booking && prev.reject,
      enabled: prev.booking || prev.reject ? prev.enabled : false,
    }));
  }, [emailState.booking, emailState.reject]);

  useEffect(() => {
    setWebState((prev) => ({
      ...prev,
      allChecked: prev.booking && prev.reject,
      enabled: prev.booking || prev.reject ? prev.enabled : false,
    }));
  }, [webState.booking, webState.reject]);

  // Unified notification update handler
  const updateNotification = useCallback(
    async (channel: string, type: string, isEnable: boolean) => {
      startTransition(async () => {
        try {
          const result = await updateNotificationSetting({
            channel,
            type,
            isEnable,
          });

          if (!result.success) {
            toast.error(
              result.message || "Failed to update notification setting",
            );
          } else {
            toast.success(
              result.message || "Notification setting updated successfully",
            );
          }
        } catch (error) {
          toast.error("An error occurred while updating notification setting");
          console.error("Error updating notification:", error);
        }
      });
    },
    [startTransition],
  );

  // Generic handler factory for notification types
  const createNotificationHandler = useCallback(
    (
      channel: string,
      notificationType: NotificationType,
      setState: React.Dispatch<React.SetStateAction<ChannelState>>,
      otherType: NotificationType,
    ) => {
      return (checked: boolean) => {
        setState((prev) => ({ ...prev, [notificationType]: checked }));

        // Determine the appropriate update based on current state
        const otherChecked =
          setState === setEmailState
            ? notificationType === "booking"
              ? emailState.reject
              : emailState.booking
            : notificationType === "booking"
              ? webState.reject
              : webState.booking;

        if (!checked) {
          // Unchecking: send individual update for remaining item or disable all
          if (otherChecked) {
            updateNotification(channel, otherType, true);
          } else {
            updateNotification(channel, "all", false);
          }
        } else {
          // Checking: send "all" if both are enabled, otherwise individual
          if (otherChecked) {
            updateNotification(channel, "all", true);
          } else {
            updateNotification(channel, notificationType, true);
          }
        }
      };
    },
    [emailState, webState, updateNotification],
  );

  // Channel-level handlers
  const handleChannelToggle = useCallback(
    (
      channel: string,
      enabled: boolean,
      setState: React.Dispatch<React.SetStateAction<ChannelState>>,
    ) => {
      setState((prev) => ({
        ...prev,
        enabled,
        booking: enabled ? true : prev.booking,
        reject: enabled ? true : prev.reject,
        allChecked: enabled ? true : prev.allChecked,
      }));

      updateNotification(channel, "all", enabled);
    },
    [updateNotification],
  );

  const handleAllToggle = useCallback(
    (
      channel: string,
      checked: boolean,
      setState: React.Dispatch<React.SetStateAction<ChannelState>>,
    ) => {
      setState((prev) => ({
        ...prev,
        booking: checked,
        reject: checked,
        allChecked: checked,
      }));

      updateNotification(channel, "all", checked);
    },
    [updateNotification],
  );

  // Email notification options
  const emailOptions = [
    {
      id: "confirmed-booking",
      label: "Confirmed Booking",
      checked: emailState.booking,
      onCheckedChange: createNotificationHandler(
        "email",
        "booking",
        setEmailState,
        "reject",
      ),
    },
    {
      id: "rejected-booking",
      label: "Rejected Booking",
      checked: emailState.reject,
      onCheckedChange: createNotificationHandler(
        "email",
        "reject",
        setEmailState,
        "booking",
      ),
    },
  ];

  // Web app notification options
  const webOptions = [
    {
      id: "web-confirmed-booking",
      label: "Confirmed Booking",
      checked: webState.booking,
      onCheckedChange: createNotificationHandler(
        "web",
        "booking",
        setWebState,
        "reject",
      ),
    },
    {
      id: "web-rejected-booking",
      label: "Rejected Booking",
      checked: webState.reject,
      onCheckedChange: createNotificationHandler(
        "web",
        "reject",
        setWebState,
        "booking",
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Email Notifications */}
      <NotificationSection
        title="Email Notifications"
        enabled={emailState.enabled}
        onEnabledChange={(enabled) =>
          handleChannelToggle("email", enabled, setEmailState)
        }
        options={emailOptions}
        showAllCheckbox
        allChecked={emailState.allChecked}
        onAllCheckedChange={(checked) =>
          handleAllToggle("email", checked, setEmailState)
        }
      />

      {/* Web App Notifications */}
      <NotificationSection
        title="Web App Notifications"
        enabled={webState.enabled}
        onEnabledChange={(enabled) =>
          handleChannelToggle("web", enabled, setWebState)
        }
        options={webOptions}
        showAllCheckbox
        allChecked={webState.allChecked}
        onAllCheckedChange={(checked) =>
          handleAllToggle("web", checked, setWebState)
        }
      />
    </div>
  );
};

export default BookingStatusNotification;
