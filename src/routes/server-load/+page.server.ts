import { FAUNA_KEY } from '$env/static/private';
import type { Butler } from '$lib/model/Butler';
import type { FqlResponse } from '$lib/model/common/fauna';
import faunadb from 'faunadb';

export async function load() {
	const client = new faunadb.Client({ secret: FAUNA_KEY });
	const { Paginate, Match, Index } = faunadb.query;

	const doc = await client.query(Paginate(Match(Index('all_clients')))) as FqlResponse;
  const res = doc.data.map((d): Butler => {
    return {
      id: d[0] as string,
      name: d[1] as string,
      email: d[2] as string,
    };
  });

	return {res};
}
