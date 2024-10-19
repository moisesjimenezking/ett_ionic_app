import { Animation, AnimationController, TransitionOptions } from "@ionic/angular";

const DURATION = 280;
export const pageTransition = (_: HTMLElement, opts: TransitionOptions): Animation => {

    const animationCtrl = new AnimationController();

    try {
        if (opts.direction == 'forward') {
            const animation = animationCtrl.create();
            const rootAnimation = animationCtrl
                .create()
                .addElement(opts.enteringEl)
                .duration(DURATION)
                .iterations(1)
                .easing('ease-in')
                .beforeStyles({ background: 'hsl(var(--background))' })
                .fromTo('transform', 'translateX(90vw)', 'translateX(0)')
                .fromTo('opacity', '.8', '1');
            animation.addAnimation(rootAnimation);
            if (opts.leavingEl) {
                const leavingAnimation = animationCtrl
                    .create()
                    .addElement(opts.leavingEl!)
                    .duration(DURATION)
                    .iterations(1)
                    .easing('ease-in')
                    .beforeStyles({ background: 'hsl(var(--background))' })
                    .fromTo('transform', 'scale(1)', 'scale(.95)')
                    .fromTo('opacity', '1', '.8');

                animation.addAnimation(leavingAnimation);
            }

            return animation;
        }
        const rootAnimation = animationCtrl
            .create()
            .addElement(opts.enteringEl)
            .duration(DURATION)
            .iterations(1)
            .easing('ease-in')
            .beforeStyles({ background: 'hsl(var(--background))' })
            .fromTo('transform', 'scale(.95)', 'scale(1)')
            .fromTo('opacity', '.8', '1')

        const leavingAnimation = animationCtrl
            .create()
            .addElement(opts.leavingEl!)
            .duration(DURATION)
            .iterations(1)
            .onFinish((currentStep: number) => {
                if (currentStep == 1 && leavingAnimation.elements?.length > 0) {
                    leavingAnimation.elements[0].style.setProperty('display', 'none')
                }
            })
            .easing('ease-out')
            .beforeStyles({ background: 'hsl(var(--background))' })
            .fromTo('transform', 'translateX(0)', 'translateX(100%)')
            .fromTo('opacity', '0.8', '0');

        return animationCtrl.create().addAnimation(
            [rootAnimation, leavingAnimation]
        );


    } catch (error) {
        return animationCtrl.create();
    }
}