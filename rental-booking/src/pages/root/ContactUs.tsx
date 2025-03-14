import { Contact } from "@/@types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Map from "@/components/ui/Map";

const contacts: Contact[] = [
  {
    icon: "/icons/phone_icon.svg",
    title: "Telephone",
    contacts: ["+00 123 456 789", "+00 987 654 321"],
  },
  {
    icon: "/icons/email_icon_white.svg",
    title: "Email Address",
    contacts: ["tura@gmail.com", "sales@primeproperties.com"],
  },
  {
    icon: "/icons/address_icon_white.svg",
    title: "Our Address",
    contacts: ["4517 Washington Ave. Manchester, Kentucky 39495"],
  },
];

const formSchema = z.object({
  fullNames: z.string().min(2, "Full Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  subject: z.string().min(2, "Subject must be at least 2 characters."),
});

const ContactUs = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullNames: "",
      email: "",
      message: "",
      subject: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };
  return (
    <div className="w-full mt-20">
      <main className="px-4 xl:px-60 lg:px-40 md:px-12 py-20 flex flex-col space-y-5">
        <div className="flex flex-col space-y-5">
          <div className="space-y-2">
            <p className="text-xl font-medium">Get In Touch</p>
            <div className="w-16 bg-primary-light border-2 border-primary-light rounded-xl" />
          </div>
          <p className="max-w-2xl text-gray-primary/50">
            There are many variations of passages of lorem Ipsum available but
            the majority have suffered alteration in some form injected is a
            humour randomised words which look slightly believable.
          </p>
        </div>

        <div className="flex md:flex-row flex-col space-x-0 md:space-x-10 space-y-5 md:space-y-0">
          <div className="flex flex-col p-6 border-[#D3DEE8] border w-full md:w-2/3 space-y-6 justify-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-4">
                  <div className="flex w-full space-x-5">
                    <FormField
                      control={form.control}
                      name="fullNames"
                      render={({ field }) => (
                        <FormItem className="input-wrapper contact-form">
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Type Full Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="input-wrapper contact-form">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Your email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Type subject"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Type your message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
          <div className="flex flex-col space-y-5 w-full md:w-1/3 border border-[#D3DEE8] rounded-sm p-5">
            {contacts.map((contact, i) => (
              <div
                className={
                  i !== contacts.length - 1
                    ? "flex flex-col items-center py-4 space-y-3 border-b-2"
                    : "flex flex-col items-center py-4 space-y-3"
                }
                key={i}
              >
                <div className="rounded-full w-12 flex items-center justify-center h-12 bg-primary-light">
                  <img src={contact.icon} height={20} width={20} />
                </div>
                <p className="font-medium">{contact.title}</p>
                <div className="flex flex-col items-center">
                  {contact.contacts.map((con, i) => (
                    <p key={i} className="text-center text-base">
                      {con}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Map height={'55vh'} />
    </div>
  );
};

export default ContactUs;
