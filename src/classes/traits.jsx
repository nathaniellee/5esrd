import PropTypes from 'prop-types';
import React from 'react';
import './classes.css';
import { StartingEquipment } from './startingEquipment';
import {
  getArmorString,
  getHitDieString,
  getSavingThrowString,
  getWeaponsString,
} from './utils';

const Trait = ({ label, value }) => (
  <tr>
    <td>{`${label}:`}</td>
    <td>{value}</td>
  </tr>
);

Trait.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export const Traits = ({
  hitDie,
  name,
  proficiencies,
  savingThrows,
  startingEquipment,
}) => {
  return (
    <table className="TraitsTable">
      <tbody>
        <Trait
          label="Hit Point Die"
          value={getHitDieString(hitDie, name)}
        />
        <Trait
          label="Saving Throw Proficiencies"
          value={getSavingThrowString(savingThrows)}
        />
        <Trait
          label="Skill Proficiencies"
          value={proficiencies.skills}
        />
        {proficiencies.tools.length > 0 && (
          <Trait
            label="Tool Proficiencies"
            value={proficiencies.tools}
          />
        )}
        <Trait
          label="Weapon Training"
          value={getWeaponsString(proficiencies.weapons)}
        />
        <Trait
          label="Armor Training"
          value={getArmorString(proficiencies.armor)}
        />
        <Trait
          label="Starting Equipment"
          value={
            <StartingEquipment
              granted={startingEquipment.granted}
              options={startingEquipment.options}
            />
          }
        />
      </tbody>
    </table>
  );
};

Traits.propTypes = {
  hitDie: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  proficiencies: PropTypes.shape({
    armor: PropTypes.arrayOf(PropTypes.string).isRequired,
    skills: PropTypes.string.isRequired,
    tools: PropTypes.arrayOf(PropTypes.string).isRequired,
    weapons: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  savingThrows: PropTypes.arrayOf(PropTypes.string).isRequired,
  startingEquipment: PropTypes.shape({
    granted: PropTypes.arrayOf(PropTypes.string).isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
