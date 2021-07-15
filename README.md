# My-To-Do-App

A simple To Do app created with React Native (using [expo](https://expo.io/)) and [React Native Paper](https://reactnativepaper.com/).

The app is available on Google Play here: [My To Do App](https://play.google.com/store/apps/details?id=com.milesbd.ToDoApp) with an iOS version coming soon!

## About
The motivation for the app was simple - allow users to have a **single** To Do list, on their phone, to promote conscious focus on the important tasks. 

As such the list is stored uniquely on the device, with no remote backups, no cross-device synchronization - just a list of the tasks to accomplish.

## Technical Info

#### Dependencies
This app uses the [AsyncStorage](https://www.npmjs.com/package/@react-native-async-storage/async-storage)  package to store list items on the device. The simplicity of this package is what led to choosing it as the storage method of choice.

The App also uses [lodash](https://lodash.com/) to sort items by create/complete time (using the `sortBy` function). This will hopefully be written out to minimize external dependencies.

The third external dependency (apart from those that are included when creating an expo app) is [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/). This was added to have the "swipe to reveal" functionality to expose the delete button for list items.

## Contribution Ideas
I'm happy to collaborate and give credit on this app should anyone be interested! Some ideas would be:

 - Change to a more performant storage system
 - Remove dependency on lodash
 - Improve animation on the swipe action
