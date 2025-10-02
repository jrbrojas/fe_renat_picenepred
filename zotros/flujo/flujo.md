- main
    - context/ContextProvider
    - router

        - components/GuestLayout
            - views/Login
            - views/Signup
            - context/ContextProvider
        - components/DefaultLayout
            - containers/LeftSidebar
                - routes/sidebar
                    - views/protected/Dashboard
                    - views/Users
                    - views/UserForm
                    - views/NotFound
                - containers/SidebarSubmenu

            - containers/Header
            - context/ContextProvider


- main (flujo no usado)
    - App
        - containers/Layout
            - containers/PageContent
                - containers/Header
                - containers/SuspenseContent
            - containers/LeftSidebar
        - views/Login
    