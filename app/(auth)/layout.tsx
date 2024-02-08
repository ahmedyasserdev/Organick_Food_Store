const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex-center min-h-screen w-full bg-light-gray ">
        {children}
      </div>
    )
  }
  
  export default Layout