import { query as q } from 'faunadb';
import { serverClient } from '../../../utils/fauna-auth';

export default async (req, res) => {
  try {
    const customers = await serverClient.query(
      // iterate each item in result
      q.Map(
        // make paginatable
        q.Paginate(
          // query index
          q.Match(
            // Specific source
            q.Index('all_customers')
          )
        ),
        // lookup each result by its reference
        (ref) => q.Get(ref)
      )
    );
    // ok
    res.status(200).json(customers.data);
  } catch (e) {
    // something went weong
    res.status(500).json({error: e.message});
  }
};