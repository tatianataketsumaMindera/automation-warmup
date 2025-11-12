import { test, expect } from '@playwright/test';
import { TYPES } from './data/pokemonType.data';

test('Validate Normal TYPE', async ({ request }) => {
    const response = await request.get('https://pokeapi.co/api/v2/type/normal');

    const body = await response.json();

    expect(body.damage_relations.double_damage_from[0].name).toBe(TYPES[0].doubleDamage);
  
});