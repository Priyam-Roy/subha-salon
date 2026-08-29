import React from 'react';
import { 
  Bell, 
  CheckCheck, 
  Sparkles, 
  Calendar, 
  Tag, 
  Info, 
  X, 
  Volume2 
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';

interface NotificationDropdownProps {
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    requestPushPermission, 
    pushPermissionState,
    openBooking
  } = useSalon();

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="w-4 h-4 text-[#5c0d1e]" />;
      case 'offer':
        return <Tag className="w-4 h-4 text-emerald-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div 
      id="notification-dropdown-panel"
      className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-stone-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Header */}
      <div className="p-4 bg-rose-50 border-b border-stone-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#5c0d1e]" />
          <h4 className="font-cinzel text-xs font-black text-stone-950 uppercase tracking-wide">
            Notifications & Alerts
          </h4>
        </div>
        <div className="flex items-center gap-2">
          {notifications.some(n => !n.read) && (
            <button
              onClick={markAllNotificationsAsRead}
              className="text-[11px] text-[#5c0d1e] hover:underline flex items-center gap-1 font-bold"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark read</span>
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-stone-500 hover:text-stone-900 p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Push Notification Banner */}
      {pushPermissionState !== 'granted' && (
        <div className="p-3 bg-amber-50 border-b border-amber-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-stone-700 font-medium">
            <Volume2 className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>Enable browser push alerts for appointments?</span>
          </div>
          <button
            onClick={() => requestPushPermission()}
            className="ml-2 px-2.5 py-1 bg-[#5c0d1e] text-white font-bold text-[10px] uppercase rounded hover:bg-[#7a1228] transition-colors flex-shrink-0"
          >
            Enable
          </button>
        </div>
      )}

      {/* Notification List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-stone-500 text-xs font-medium">
            <Info className="w-6 h-6 mx-auto text-stone-400 mb-2" />
            No new notifications at this time
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => markNotificationAsRead(item.id)}
              className={`p-3.5 transition-colors cursor-pointer flex gap-3 items-start ${
                item.read ? 'bg-white hover:bg-stone-50' : 'bg-rose-50/40 hover:bg-rose-50/70'
              }`}
            >
              <div className="p-2 rounded-lg bg-rose-50 border border-stone-200 flex-shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h5 className={`text-xs font-bold truncate ${item.read ? 'text-stone-700' : 'text-stone-950 font-black'}`}>
                    {item.title}
                  </h5>
                  <span className="text-[10px] text-stone-400 flex-shrink-0 font-medium">{item.time}</span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed line-clamp-2 font-medium">
                  {item.message}
                </p>
                {item.type === 'offer' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                      openBooking();
                    }}
                    className="mt-2 text-[10px] text-[#5c0d1e] hover:underline font-black uppercase tracking-wider flex items-center gap-1"
                  >
                    Claim Offer Now →
                  </button>
                )}
              </div>
              {!item.read && (
                <div className="w-2 h-2 rounded-full bg-[#5c0d1e] flex-shrink-0 mt-1.5" />
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-stone-50 border-t border-stone-100 text-center text-[10px] text-stone-500 font-medium">
        Subha Salon Live Push & Notification Dispatch System
      </div>
    </div>
  );
};

export default NotificationDropdown;
