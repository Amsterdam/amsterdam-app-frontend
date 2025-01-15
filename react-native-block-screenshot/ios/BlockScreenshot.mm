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

- (void)secureViewWithImage:(std::optional<JS::NativeBlockScreenshot::ImageResolvedAssetSource>)source
                  withScale:(double)scale
        withBackgroundColor:(double)backgroundColor
{
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

        if (source->uri()) {
            NSString *uriImage = source->uri();
            CGFloat scaleValue = scale;

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
                        textField.backgroundColor = [RCTConvert UIColor:@(backgroundColor)];
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


//- (void)disableBlockScreenshot:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
//    <#code#>
//}
//
- (void)enableBlockScreenshot:(JS::NativeBlockScreenshot::SpecEnableBlockScreenshotParams &)data {
//    <#code#>
//}

//RCT_EXPORT_METHOD(enableBlockScreenshot:(JS::NativeBlockScreenshot::SpecEnableBlockScreenshotParams &)data) {
//    if (![data isKindOfClass:[NSDictionary class]]) {
//        NSLog(@"Invalid data type for enableBlockScreenshot");
//        return;
//    }
    
    std::optional<JS::NativeBlockScreenshot::ImageResolvedAssetSource> source = data.source();
    double scale = data.scale();
    double backgroundColor = data.backgroundColor();

    dispatch_async(dispatch_get_main_queue(), ^{
        [self secureViewWithImage:source withScale:scale withBackgroundColor:backgroundColor];
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

//RCT_EXPORT_METHOD(disableBlockScreenshot) {
- (void)disableBlockScreenshot {
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

// Declare an instance variable to store the observer
id screenshotObserver;

// Register screenshot event listener and emit events

- (void)addListener:(NSString *)eventName {
//RCT_EXPORT_METHOD(addEventListener) {
    NSNotificationCenter *center = [NSNotificationCenter defaultCenter];
    NSOperationQueue *mainQueue = [NSOperationQueue mainQueue];
    
    // Remove the existing observer if it exists
    if (screenshotObserver) {
        [center removeObserver:screenshotObserver];
        screenshotObserver = nil;
    }

    // Add a new observer and store it in the instance variable
    screenshotObserver = [center addObserverForName:UIApplicationUserDidTakeScreenshotNotification
                                             object:nil
                                              queue:mainQueue
                                         usingBlock:^(NSNotification *notification) {
        [self emitOnScreenshot];
    }];
}

//RCT_EXPORT_METHOD(removeEventListener) {

- (void)removeListeners:(double)count {
    NSNotificationCenter *center = [NSNotificationCenter defaultCenter];
    NSOperationQueue *mainQueue = [NSOperationQueue mainQueue];
     if (screenshotObserver) {
        [center removeObserver:screenshotObserver];
        screenshotObserver = nil;
    }
}

// Override method to specify which events to support
- (NSArray<NSString *> *)supportedEvents {
    return @[@"onScreenshot"]; // List all events your module will emit
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeBlockScreenshotSpecJSI>(params);
}

@end
