import './Controle.scss';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import * as tacheModele from '../code/tache-modele';
import { useState, useEffect } from 'react';

export default function Controle({etatTaches, utilisateur, etatFiltreTaches}) {  

  const [taches, setTaches] = etatTaches;
  const [filtreTaches, setFiltreTaches] = etatFiltreTaches;
  const [tachesActives, setTachesActives] = useState(0);
  
  useEffect(() => setTachesActives(taches.reduce(
    (acc, courrante) => {
      if (courrante.completee == false) {
        acc++;
      }
      return acc;
    }
  , 0), [setTaches]));

  function changerFiltreTaches(filtre) {
    console.log(filtre);
    setFiltreTaches(filtre);
  }

  async function supprimerTachesCompletee(uid) {
    await tacheModele.supprimerToutCompletee(uid);
    const tachesNonCompletees = taches.filter(tache => tache.completee == false);
    setTaches(tachesNonCompletees);
  }

  return (
    <footer className="Controle">
      <ToggleButtonGroup 
        size="small" 
        exclusive={true} 
      >
        <ToggleButton value={'toutes'} onClick={() => changerFiltreTaches('toutes')}>Toutes</ToggleButton>
        <ToggleButton value={true} onClick={() => changerFiltreTaches('completees')}>Complétées</ToggleButton>
        <ToggleButton value={false} onClick={() => changerFiltreTaches('actives')}>Actives</ToggleButton>
      </ToggleButtonGroup>
      <span className="compte">
        {tachesActives} {tachesActives > 1 ? 'taches actives' : 'tache active'}
      </span>
      <IconButton 
        aria-label="Supprimer toutes les tâches complétées"
        color="error" 
        onClick={() => supprimerTachesCompletee(utilisateur.uid)} 
        title="Supprimer toutes les tâches complétées"
      >
        <DeleteIcon/>
      </IconButton>
    </footer>
  );
}