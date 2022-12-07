 # frozen_string_literal: true

 class RedirectionValidator < ActiveModel::Validator
   include ActionView::Helpers::TranslationHelper

   def validate(record)
     check_both_input_is_not_same(record)
     check_cyclic_redirection_does_not_exist(record)
   end

   private

     def check_both_input_is_not_same(record)
       record.errors.add(:base, t("redirection.same_path")) if record.from == record.to
     end

     def check_cyclic_redirection_does_not_exist(record)
       next_path = record.to
       while (r = Redirection.find_by(from: next_path))
         if r.to === record.from
           record.errors.add(:base, t("redirection.cyclic_redirection"))
           break
         end
         next_path = r.to
       end
     end
 end
