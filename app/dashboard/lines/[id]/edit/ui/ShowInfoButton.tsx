'use client';

import {useState} from "react";
import InformationDialog from "@/app/dashboard/lines/[id]/edit/ui/InformationDialog";

export default function ShowInfoButton() {
    
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const handleOpenDialog = () => {
        setIsDialogOpen(true)
    }
    
    const handleCloseDialog = () => {
        setIsDialogOpen(false)
    }
        
    return (
        <div>
          <button onClick={handleOpenDialog}>Instrucciones</button>
          {isDialogOpen && (
            <InformationDialog onClose={handleCloseDialog} />
          )}
        </div>
      );
}