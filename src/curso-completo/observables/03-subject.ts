import { Observable, Observer, Subject } from 'rxjs';

// ¿Que es un Subject
// Un subject es, un observer y un observable al mismo tiempo. Una especie de “Read & Write”
//  1. Puede insertarle nuevos valores
//  2. como también suscribirse a ellos. 
// https://blog.mudafy.com/subjects-vs-observables/

const observer: Observer<any> = {
    next : value => console.log('next:', value ),
    error: error => console.warn('error:', error ),
    complete: () => console.info('completado')
};


const intervalo$ = new Observable<number>( subs => {

    const intervalID = setInterval( 
      () => subs.next( Math.random() ), 1000 
    );

    return () => {
        clearInterval( intervalID );
        console.log('Intervalo destruido')
    };

});

/**
 * 1- Casteo múltiple
 * 2- También es un observer
 * 3- Next, error y complete
 */

const subject$ = new Subject();
const subscription = intervalo$.subscribe( subject$ );


const subs1 = intervalo$.subscribe( rnd => console.log('subs1', rnd) );
const subs2 = intervalo$.subscribe( rnd => console.log('subs2', rnd) );

// const subs1 = subject$.subscribe( (v)=> console.log("subs1",v) );
// const subs2 = subject$.subscribe( (v)=> console.log("subs2",v));


setTimeout( () => {

    subject$.next(10);
    subject$.complete();
    subscription.unsubscribe();

}, 3500 );

