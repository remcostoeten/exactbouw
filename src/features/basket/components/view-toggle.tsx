'use client'

import { Button } from '@/components/ui/button'
import { LayoutGrid, List } from 'lucide-react'

type ViewMode = 'grid' | 'list'

type ViewToggleProps = {
    currentView: ViewMode
    onViewChange: (view: ViewMode) => void
}

export default function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
    return (
        <div className="flex gap-2">
            <Button
                variant={currentView === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => onViewChange('grid')}
            >
                <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
                variant={currentView === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => onViewChange('list')}
            >
                <List className="h-4 w-4" />
            </Button>
        </div>
    )
}
