import { AvailablePackages } from "../types";

export function configureProjectFiles(
    files: string[],
    navigationPackage: AvailablePackages | undefined,
    useNativewind: boolean,
): string[] {
    // Define the files common to all templates to be generated
    const baseFiles = [
        'base/assets/adaptive-icon.png',
        'base/assets/favicon.png',
        'base/assets/icon.png',
        'base/assets/splash.png',
        'base/tsconfig.json.ejs',
        'base/app.json.ejs',
        'base/App.tsx.ejs',
        'base/babel.config.js.ejs',
        'base/package.json.ejs',
        'base/.gitignore.ejs',
      ];

      files = [
        ...baseFiles,
      ];

      // add nativewind files if needed
      // modify base files with nativewind specifications
      if (useNativewind) {
        const nativewindFiles = [
          'packages/nativewind/tailwind.config.js.ejs',
          'packages/nativewind/app.d.ts',
        ];

        files = [
          ...files,
          ...nativewindFiles,
        ];
      };

      // add react navigation files if needed
      // modify base files with react navigation specifications
      if (navigationPackage?.name === "react-navigation") {
        let reactNavigationFiles = [
          'packages/react-navigation/App.tsx.ejs',
          'packages/react-navigation/navigation/index.tsx.ejs',
        ];
        // if it's a stack, add the stack files) {
        if (navigationPackage.options === "stack") {
          reactNavigationFiles = [
            ...reactNavigationFiles,
            'packages/react-navigation/screens/details.tsx.ejs',
            'packages/react-navigation/screens/overview.tsx.ejs',
          ];
        } else {
          // it's a tab navigator
          reactNavigationFiles = [
            ...reactNavigationFiles,
            'packages/react-navigation/components/edit-screen-info.tsx.ejs',
            'packages/react-navigation/navigation/tab-navigator.tsx.ejs',
            'packages/react-navigation/screens/modal.tsx.ejs',
            'packages/react-navigation/screens/one.tsx.ejs',
            'packages/react-navigation/screens/two.tsx.ejs',
          ];
        }

        // Remove the base App.tsx.ejs file since we'll be using the one from react-navigation
        files = files.filter((file) => file !== 'base/App.tsx.ejs');

        files = [
          ...files,
          ...reactNavigationFiles,
        ];
      }

      // add expo router files if needed
      // modify base files with expo router specifications
      if (navigationPackage?.name === "expo-router") {
        let expoRouterFiles = [
          'packages/expo-router/expo-env.d.ts',
          'packages/expo-router/metro.config.js',
          'packages/expo-router/index.ts'
        ];
        // if it's a stack, add the stack files) {
        if (navigationPackage.options === "stack") {
          expoRouterFiles = [
            ...expoRouterFiles,
            'packages/expo-router/stack/app/_layout.tsx.ejs',
            'packages/expo-router/stack/app/details.tsx.ejs',
            'packages/expo-router/stack/app/index.tsx.ejs',
          ];
        } else {
          // it's a tab navigator
          expoRouterFiles = [
            ...expoRouterFiles,
            'packages/expo-router/tabs/app/(tabs)/_layout.tsx.ejs',
            'packages/expo-router/tabs/app/(tabs)/index.tsx.ejs',
            'packages/expo-router/tabs/app/(tabs)/two.tsx.ejs',
            'packages/expo-router/tabs/app/_layout.tsx.ejs',
            'packages/expo-router/tabs/app/modal.tsx.ejs',
            'packages/expo-router/tabs/components/edit-screen-info.tsx.ejs',
          ];
        }

        // Remove the base App.tsx.ejs file since we'll be using index.tsx from expo-router
        files = files.filter((file) => file !== 'base/App.tsx.ejs');

        files = [
          ...files,
          ...expoRouterFiles,
        ];
      }
    return files;
}