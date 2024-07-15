#import "BlockScreenshot.h"
#import <React/RCTImageLoader.h>
#import <React/RCTBridge.h>
#import <React/RCTConvert.h>
#import <React/RCTEventEmitter.h> // Import RCTEventEmitter

@implementation BlockScreenshot

RCT_EXPORT_MODULE()

bool hasListeners;

UITextField *textField;
UIImageView *imageView;
UIScrollView *scrollView;
RCTBridge *_bridge;

// Ensure proper RCTEventEmitter initialization
- (instancetype)init {
    if (self = [super init]) {
        _bridge = nil;
    }
    return self;
}

// Implement required RCTBridge setter and getter
- (void)setBridge:(RCTBridge *)bridge {
    _bridge = bridge;
}

- (RCTBridge *)bridge {
    return _bridge;
}

// Initialize and configure textField
- (void)initTextField {
    CGRect screenRect = [[UIScreen mainScreen] bounds];
    textField = [[UITextField alloc] initWithFrame:CGRectMake(0, 0, screenRect.size.width, screenRect.size.height)];
    textField.translatesAutoresizingMaskIntoConstraints = NO;
    textField.textAlignment = NSTextAlignmentCenter;
    textField.userInteractionEnabled = NO;

    UIWindow *window = [UIApplication sharedApplication].keyWindow;
    [window makeKeyAndVisible];
    [window.layer.superlayer addSublayer:textField.layer];

    if (textField.layer.sublayers.firstObject) {
        [textField.layer.sublayers.firstObject addSublayer:window.layer];
    }
}

- (void)secureViewWithImageAlignment:(nonnull NSDictionary *)source
                           withScale:(nonnull NSNumber *)scale
                 withBackgroundColor:(nonnull NSString *)backgroundColor 
{
    [self disableBlockScreenshotFn];
    if (@available(iOS 13.0, *)) {
        if (!textField) {
            [self initTextField];
        }

        [textField setSecureTextEntry:YES];
        [textField setContentMode:UIViewContentModeCenter];
        
        if (!scrollView) {
            scrollView = [[UIScrollView alloc] initWithFrame:[UIScreen mainScreen].bounds];
        }
        scrollView.showsHorizontalScrollIndicator = NO;
        scrollView.showsVerticalScrollIndicator = NO;
        scrollView.scrollEnabled = NO;

        if (source[@"uri"]) {
            NSString *uriImage = source[@"uri"];
            CGFloat scaleValue = [scale doubleValue];

            // Load the image from the URI
            [[_bridge moduleForClass:[RCTImageLoader class]] loadImageWithURLRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:uriImage]]
                                                                                 size:CGSizeZero
                                                                                scale:UIScreen.mainScreen.scale
                                                                              clipped:NO
                                                                           resizeMode:RCTResizeModeContain
                                                                        progressBlock:nil
                                                                     partialLoadBlock:nil
                                                                      completionBlock:^(NSError *error, UIImage *image) {
                if (image) {
                    dispatch_async(dispatch_get_main_queue(), ^{
                        CGFloat screenWidth = [UIScreen mainScreen].bounds.size.width;
                        CGFloat imageViewWidth = screenWidth * scaleValue;
                        CGFloat imageViewHeight = imageViewWidth * (image.size.height / image.size.width);

                        imageView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, imageViewWidth, imageViewHeight)];
                        imageView.translatesAutoresizingMaskIntoConstraints = NO;
                        imageView.clipsToBounds = YES;
                        [scrollView addSubview:imageView];

                        CGFloat scrollViewWidth = scrollView.bounds.size.width;
                        CGFloat scrollViewHeight = scrollView.bounds.size.height;

                        CGPoint imageViewOrigin = CGPointMake((scrollViewWidth - imageViewWidth) / 2, (scrollViewHeight - imageViewHeight) / 2);
                        imageView.frame = CGRectMake(imageViewOrigin.x, imageViewOrigin.y, imageViewWidth, imageViewHeight);

                        scrollView.contentSize = CGSizeMake(MAX(scrollViewWidth, imageViewOrigin.x + imageViewWidth),
                                                            MAX(scrollViewHeight, imageViewOrigin.y + imageViewHeight));

                        [imageView setImage:image];
                        [textField addSubview:scrollView];
                        [textField sendSubviewToBack:scrollView];
                        textField.backgroundColor = [RCTConvert UIColor:backgroundColor];
                    });
                } else {
                    NSLog(@"Error loading image: %@", error);
                }
            }];
        }
    } else {
        NSLog(@"iOS version is not supported for secure view.");
        return;
    }
}

RCT_EXPORT_METHOD(enableBlockScreenshot:(nonnull NSDictionary *)data) {
    if (![data isKindOfClass:[NSDictionary class]]) {
        NSLog(@"Invalid data type for enableBlockScreenshot");
        return;
    }

    NSDictionary *source = data[@"source"];
    NSNumber *scale = data[@"scale"];
    NSString *backgroundColor = data[@"backgroundColor"];

    dispatch_async(dispatch_get_main_queue(), ^{
        [self secureViewWithImageAlignment:source withScale:scale withBackgroundColor:backgroundColor];
    });
}

- (void)disableBlockScreenshotFn {
    if (textField) {
        if (imageView) {
            [imageView setImage:nil];
            [imageView removeFromSuperview];
            imageView = nil;
        }
        if (scrollView) {
            [scrollView removeFromSuperview];
            scrollView = nil;
        }
        textField.secureTextEntry = NO;
        textField.backgroundColor = [UIColor clearColor];
        textField.background = nil;
        CALayer *textFieldLayer = textField.layer.sublayers.firstObject;
        UIWindow *window = [UIApplication sharedApplication].keyWindow;
        if ([window.layer.superlayer.sublayers containsObject:textFieldLayer]) {
            [textFieldLayer removeFromSuperlayer];
        }
    }
}

RCT_EXPORT_METHOD(disableBlockScreenshot) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [self disableBlockScreenshotFn];
        [[NSNotificationCenter defaultCenter] removeObserver:UIApplicationUserDidTakeScreenshotNotification];
        [[NSNotificationCenter defaultCenter] removeObserver:UIScreenCapturedDidChangeNotification];
    });
}

// Implement the method to convert UIView to UIImage
- (UIImage *)convertViewToImage:(UIView *)view {
    UIGraphicsBeginImageContextWithOptions(view.bounds.size, NO, 0.0);
    [view.layer renderInContext:UIGraphicsGetCurrentContext()];
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return image;
}

// Register screenshot event listener and emit events
RCT_EXPORT_METHOD(addEventListener) {
    NSNotificationCenter *center = [NSNotificationCenter defaultCenter];
    NSOperationQueue *mainQueue = [NSOperationQueue mainQueue];
    [center removeObserver:self
                      name:UIApplicationUserDidTakeScreenshotNotification
                    object:nil];
    [center addObserverForName:UIApplicationUserDidTakeScreenshotNotification
                        object:nil
                         queue:mainQueue
                    usingBlock:^(NSNotification *notification) {
        [self sendEventWithName:@"onScreenshot" body:nil]; // Emit event to JavaScript
    }];
}

RCT_EXPORT_METHOD(removeEventListener) {
    NSNotificationCenter *center = [NSNotificationCenter defaultCenter];
    NSOperationQueue *mainQueue = [NSOperationQueue mainQueue];
    [center removeObserver:self
                      name:UIApplicationUserDidTakeScreenshotNotification
                    object:nil];
    [center removeObserver:self
                      name:UIScreenCapturedDidChangeNotification
                    object:nil];
}

// Override required RCTEventEmitter methods if needed

// Override method to specify which events to support
- (NSArray<NSString *> *)supportedEvents {
    return @[@"onScreenshot"]; // List all events your module will emit
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeBlockScreenshotSpecJSI>(params);
}
#endif

@end