import React, { useState } from "react";
import { ExternalLink, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditableContactLinkProps {
  icon: React.ReactNode;
  title: string;
  initialUrl: string;
  isEmail?: boolean;
  showEditControls?: boolean;
}

const EditableContactLink: React.FC<EditableContactLinkProps> = ({
  icon,
  title,
  initialUrl,
  isEmail = false,
  showEditControls = false,
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(url);

  const handleSave = () => {
    setUrl(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(url);
    setIsEditing(false);
  };

  const handleLinkClick = () => {
    if (isEmail) {
      window.location.href = `mailto:${url}`;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex items-center gap-4 group">
      <div className="p-3 bg-muted rounded-lg">
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-medium text-foreground">{title}</p>
        {isEditing ? (
          <div className="flex items-center gap-2 mt-1">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="text-sm"
              placeholder={isEmail ? "email@example.com" : "https://..."}
            />
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        ) : (
          <button
            onClick={handleLinkClick}
            className="text-muted-foreground hover:text-primary transition-colors underline decoration-muted-foreground hover:decoration-primary flex items-center gap-1 text-left"
          >
            {url}
            {!isEmail && <ExternalLink className="h-3 w-3" />}
          </button>
        )}
      </div>
      {showEditControls && !isEditing && (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsEditing(true)}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Edit3 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default EditableContactLink;