jest.mock('@react-native-firebase/messaging', () => ({}))

jest.mock("react-native-bootsplash", () => {
    return {
        hide: jest.fn().mockResolvedValueOnce(),
        getVisibilityStatus: jest.fn().mockResolvedValue("hidden"),
    };
});