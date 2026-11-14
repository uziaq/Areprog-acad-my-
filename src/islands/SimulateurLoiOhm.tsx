/**
 * Simulateur pédagogique : modèle idéal, jamais une donnée constructeur (F12).
 */
import { useState } from 'preact/hooks';
import { HYPOTHESES_LOI_OHM, calculerLoiOhm, formaterGrandeur } from '../simulateurs/loi-ohm.ts';

const RESISTANCES = [10, 22, 47, 100, 220, 470, 1000, 2200, 4700, 10000];
const PUISSANCES = [0.125, 0.25, 0.5, 1, 2];

export default function SimulateurLoiOhm() {
  const [tension, setTension] = useState(5);
  const [iR, setIR] = useState(4);
  const [iP, setIP] = useState(1);
  const r = RESISTANCES[iR]!;
  const pn = PUISSANCES[iP]!;
  const res = calculerLoiOhm(tension, r, pn);
  const surcharge = res.charge > 1;
  return (
    <section class="simulateur" aria-labelledby="titre-simu-loi-ohm" data-testid="simulateur-loi-ohm">
      <h3 id="titre-simu-loi-ohm">Manipuler la loi d'Ohm</h3>
      <p class="bandeau-simulation">⚠ Simulation pédagogique : modèle idéalisé, ce n'est pas une donnée constructeur.</p>
      <div class="curseur">
        <label for="simu-u">Tension U : <strong>{tension.toLocaleString('fr-FR')} V</strong></label>
        <input id="simu-u" type="range" min="0" max="24" step="0.5" value={tension} onInput={(e) => setTension(Number((e.target as HTMLInputElement).value))} />
      </div>
      <div class="curseur">
        <label for="simu-r">Résistance R : <strong>{formaterGrandeur(r, 'Ω')}</strong></label>
        <input id="simu-r" type="range" min="0" max={RESISTANCES.length - 1} step="1" value={iR} onInput={(e) => setIR(Number((e.target as HTMLInputElement).value))} />
      </div>
      <div class="curseur">
        <label for="simu-p">Puissance nominale de la résistance : <strong>{formaterGrandeur(pn, 'W')}</strong></label>
        <input id="simu-p" type="range" min="0" max={PUISSANCES.length - 1} step="1" value={iP} onInput={(e) => setIP(Number((e.target as HTMLInputElement).value))} />
      </div>
      <div class="resultats-simu" aria-live="polite">
        <div>Courant I<strong>{formaterGrandeur(res.courant_A, 'A')}</strong></div>
        <div>Puissance P<strong>{formaterGrandeur(res.puissance_W, 'W')}</strong></div>
        <div>
          Charge
          <strong style={{ color: surcharge ? 'var(--erreur)' : 'var(--succes)' }}>{Math.round(res.charge * 100)} %</strong>
        </div>
      </div>
      <p role="status">
        {surcharge
          ? '✗ Puissance dissipée supérieure à la puissance nominale : la résistance serait surchargée.'
          : '✓ Puissance dissipée inférieure à la puissance nominale.'}
      </p>
      <details class="hypotheses">
        <summary>Hypothèses du modèle</summary>
        <ul>{HYPOTHESES_LOI_OHM.map((h) => <li>{h}</li>)}</ul>
      </details>
    </section>
  );
}
