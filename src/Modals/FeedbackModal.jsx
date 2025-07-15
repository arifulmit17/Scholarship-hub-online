import React from 'react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const FeedbackModal = ({ isOpen,setIsOpen,_id}) => {

     const queryClient = useQueryClient()
      const mutation = useMutation({
        mutationFn: async feedback => {
          const { data } = await axios.patch(
            `${import.meta.env.VITE_API_URL}/application/feedback/update/${_id}`,
            { feedback }
          )
          return data
        },
        onSuccess: data => {
          if(data.modifiedCount){
            Swal.fire("Feedback added successfully");
          }
          queryClient.invalidateQueries(['apps'])
        },
        onError: error => {
          console.log(error)
        },
      })

    const handleFeedback=e=>{
        e.preventDefault()
        const feedback=e.target.feedback.value
        mutation.mutate(feedback)
    }
    
    return (
        

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Give your feedback </DialogTitle>
            <form onSubmit={handleFeedback}>
                <textarea className="textarea" placeholder="Feedback" name="feedback"></textarea>
                <button className='btn' >Submit</button>
            </form>
            <div className="flex gap-4">
              <button className='btn' onClick={() => setIsOpen(false)}>Cancel</button>
              
            </div>
          </DialogPanel>
        </div>
      </Dialog>
        
    );
};

export default FeedbackModal;