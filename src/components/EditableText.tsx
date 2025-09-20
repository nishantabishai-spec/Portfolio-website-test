import { useState, useRef } from "react";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
interface EditableTextProps {
  text?: string;
  placeholder?: string;
  className?: string;
  showEditControls?: boolean;
  onTextChange?: (text: string) => void;
  multiline?: boolean;
}
export const EditableText = ({
  text = "",
  placeholder = "Click to add text",
  className = "",
  showEditControls = false,
  onTextChange,
  multiline = false
}: EditableTextProps) => {
  const [currentText, setCurrentText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleEditClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };
  const handleSave = () => {
    setIsEditing(false);
    onTextChange?.(currentText);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };
  if (isEditing) {
    return <div className="relative">
        <textarea ref={textareaRef} value={currentText} onChange={e => setCurrentText(e.target.value)} onBlur={handleSave} onKeyDown={handleKeyDown} className={cn("w-full bg-transparent border border-border rounded-md p-2 resize-none", "text-foreground placeholder:text-muted-foreground", "focus:outline-none focus:ring-1 focus:ring-primary", className)} placeholder={placeholder} rows={multiline ? 4 : 1} />
      </div>;
  }
  return;
};