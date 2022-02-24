import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.css']
})
export class ReviewModalComponent implements OnInit {

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    //NOT SURE IF THIS NEEDS TO BE NESTED IN NGONINIT
    const ReviewModal = () => {

        //TODO: Use these variable
        let movie_id: String = "";
        let review: String = "";
        this.apollo
        .watchQuery({
          query: gql`
            {
                createReview(movie_id: ${movie_id}, review: ${review})
            }
          `,
        })
        .valueChanges.subscribe((result: any) => {
          //Console.log if the review was removed
          console.log(`Review for movie (${movie_id}) created: `, result?.data?.createReview);
        });
  
      // let [writtenReview, setWrittenReview] = useState('');
  
      // let { register, handleSubmit } = useForm();
  
      // const handleClick = () => {
      //     props.toggle();
      // }
  
      // const addReview = async () => {
      //     await fetch(`http://localhost:3005/api/review/${props.movieId}`, {
      //         method: 'POST',
      //         credentials: 'include',
      //         headers: { 'Content-Type': 'application/json' },
      //         body: JSON.stringify({
      //             review: writtenReview
      //         })
      //     }).then(res => {
      //         return res.json();
      //     }).then(() => {
      //         handleClick();
      //     }) 
    }
  }
}
