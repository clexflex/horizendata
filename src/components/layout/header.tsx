import React from 'react'

const header = () => {
  return (
   <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-8 w-8 text-primary " />
          <span className="font-bold text-xl tracking-tight">Horizendata</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-primary transition-colors">
              <span>Solutions</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-primary transition-colors">
              <span>Industries</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          <a href="#resources" className="hover:text-primary transition-colors">Resources</a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="outline" className="hidden md:inline-flex">
            Log in
          </Button>
          <Button className="hidden md:inline-flex">
            Get Started
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default header