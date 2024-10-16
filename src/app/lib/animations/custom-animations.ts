
import {
    animate,
    style,
    transition,
    trigger,
} from '@angular/animations';


export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
        style({ opacity: 0, transfrom: 'scale(.8)' }),
        animate(
            '.25s ease-out',
            style({
                opacity: 1,
                transform: 'scale(1)',
            })
        ),
    ]),
]);